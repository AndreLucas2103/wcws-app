import { Switch } from "@headlessui/react"

export const SwitchToggle = ({ switchToggle, setSwitchToggle, descricao }: { switchToggle: boolean, setSwitchToggle: any, descricao: string}) => {
    return (
        <Switch.Group>
            <div className="flex ">
                <Switch.Description className="text-sm mt-1 mr-2">{descricao}</Switch.Description>
                <Switch
                    checked={switchToggle}
                    onChange={setSwitchToggle}
                    className={`${switchToggle ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex items-center h-4 rounded-full w-8 mt-1`}
                >

                    <span
                        className={`transform transition ease-in-out duration-200 ${switchToggle ? 'translate-x-5' : 'translate-x-1'
                            } inline-block w-2 h-2 transform bg-white rounded-full`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    )
}