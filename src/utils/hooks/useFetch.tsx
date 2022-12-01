import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/store/actions/Loading.action";
import { toastError, toastSuccess } from "../../components/avisos/toast";
import { authToken } from "../../config/authToken";
import { api } from "../services/api";

interface IErrorState { // tipagem de erro, padrão enviado pela API
    codigoPermissao?: string
    mensagem?: string
    statusCode?: number
}

export function useFetch<T = unknown>(
    url: string, // string para consulta 
    options?: {
        params?: object // parametros da consulta, req.query
        headers?: object // cabecalho da consulta, req.headers
        body?: object // corpo da consulta, req.body
        method?: 'get' | 'post' | 'put' | 'patch' | 'delete' // metodo da consulta, req.method
        resNotInData?: boolean // TRUE se o resultado não estiver sendo repassado no campo DATA (res.data.data), geralmente passado somente o resultado (res.data)
        itensRefresh?: any[] // itens para recarregar a consulta
        enable?: boolean, // caso esteja TRUE o useEffect será executado, caso contrario ele não será executado, usad para definir se uma consulta está pronta para ser executada
        pagination?: boolean, // se a requisição contem dados de paginação
        messageError?: string | null | undefined, // secaso seja null, não será exibido nenhuma mensagem de erro
        messageSucess?: string | undefined | null, // caso seja null, não será exibido nenhuma mensagem de sucesso
        disableSpinnerLoading?: boolean, // caso esteja TRUE o loading não será exibido
        delay?: number, // tempo de delay para executar a requisição
        onSuccess?: (data: { res: AxiosResponse<T>, data: T }) => void,
        onError?: (error: AxiosError) => void,
        notOpenModalWhithoutPermission?: boolean, // se TRUE o hook não irá enviar o codigo da permissao para o dispatch, sendo assim não vai abrir o modal
    },
) {
    const dispatch = useDispatch();

    const fetchAPI = url[0] === '/' ? api : axios // decide se a api vai ser a padrão ou requisição para outras

    const [cookies,] = useCookies([authToken.nomeToken]);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + cookies[authToken.nomeToken]

    const [data, setData] = useState<T | null>(null); // valor que será retorndo para o front, resultado da consulta 
    const [isFetching, setIsFetching] = useState(false); // se a consulta ainda está sendo realizada
    const [error, setError] = useState<IErrorState | null>(null); // se houve erro na consulta
    const [withoutPermission, setWithoutPermission] = useState<{ codigoPermissao: string } | null>(null); // se o usuário não tem permissão para acessar a rota

    const [count, setCount] = useState<number | null>(null); // quantidades de itens da consulta
    const [pagina, setPagina] = useState<number | null>(null); // pagina que a consulta foi realizada
    const [limite, setLimite] = useState<number | null>(null); // limite de itens da consulta

    const [refresh, setRefresh] = useState(false); // atualizar a listagem ou não

    const refetch = () => setRefresh(old => !old); // function para recarregar

    function runFetchingAPI() {

        setIsFetching(true); // inicia o loading

        if (!options?.disableSpinnerLoading) dispatch(setLoading(true))

        fetchAPI(url, {
            params: options?.params,
            headers: {
                ...options?.headers,
            },
            method: options?.method || 'get',
            data: options?.body
        })
            .then(res => {

                if (options?.pagination) {
                    setCount(res.data.count);
                    setPagina(res.data.pagina);
                    setLimite(res.data.limite);
                }

                if (options?.resNotInData) {
                    setData(res.data);
                } else {
                    setData(res.data.data);
                }

                if (options?.onSuccess) options.onSuccess({ res, data: options.resNotInData ? res.data : res.data.data });

                if (options?.messageSucess) {
                    toastSuccess(options.messageSucess);
                }

            })
            .catch((err: AxiosError<{ erro: IErrorState }>) => {

                setError({
                    mensagem: err.response?.data?.erro?.mensagem,
                    statusCode: err.response?.data?.erro?.statusCode,
                    codigoPermissao: err.response?.data?.erro?.codigoPermissao,
                });

                if (options?.onError) options.onError(err);

                if (options?.messageError !== null && err.response?.data?.erro?.statusCode !== 403) {
                    toastError(
                        options?.messageError || err.response?.data?.erro?.mensagem || "Ocorreu um erro",
                    );
                }

                if (err.response?.data?.erro?.statusCode === 403) {

                    if (!options?.notOpenModalWhithoutPermission) {
                        // abrir modal de sem permissão
                    }

                    setWithoutPermission({ codigoPermissao: err.response?.data?.erro?.codigoPermissao || "" });
                }

            })
            .finally(() => {

                setIsFetching(false)
                if (!options?.disableSpinnerLoading) dispatch(setLoading(false))

            })
    }

    function refetchUseEffect(): any[] {
        const itensParaRefresh = [ // itens que fazem o useEffect recarregar
            refresh,
        ];

        if (options?.itensRefresh && options.itensRefresh.length > 0) itensParaRefresh.push(...options.itensRefresh);

        return itensParaRefresh
    }

    useEffect(() => {
        if (options?.enable === false) return setData(null)

        if (options?.delay) {
            setTimeout(() => runFetchingAPI(), options?.delay)
        } else {
            runFetchingAPI()
        }
    }, refetchUseEffect());

    return {
        data,
        isFetching,
        error,
        withoutPermission,
        count,
        pagina,
        limite,
        refetch // função para recarregar, é chamada uma função que já execute o refresh sem necessidade de passar valores
    };
}