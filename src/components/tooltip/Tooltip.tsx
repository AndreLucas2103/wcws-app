import { cloneElement, useEffect, useRef, useState } from "react";
import {
    Placement,
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useHover,
    useRole,
    useDismiss,
    arrow
} from "@floating-ui/react-dom-interactions";

interface Props {
    label: JSX.Element;
    placement?: Placement;
    children: JSX.Element;
    classLabel?: string;
}

export const Tooltip = ({ children, label, placement = "top", classLabel }: Props) => {
    const [open, setOpen] = useState(false);
    const arrowRef = useRef(null);

    const {
        x,
        y,
        reference,
        floating,
        strategy,
        context,
        refs,
        update
    } = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [offset(5), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })]
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, {
            delay: { close: 100 },
        }),
        useRole(context, { role: "tooltip" }),
        useDismiss(context)
    ]);

    useEffect(() => {
        if (refs.reference.current && refs.floating.current && open) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [refs.reference, refs.floating, update, open]);

    return (
        <>
            {cloneElement(
                children,
                getReferenceProps({ ref: reference, ...children.props })
            )}
            {open && (
                <div
                    {...getFloatingProps({
                        ref: floating,
                        className: `px-[10px] py-[4px] text-12px font-normal text-gray-700 bg-branco rounded-md shadow-xl border border-gray-200 ${classLabel}`,
                        style: {
                            position: strategy,
                            top: y ?? "",
                            left: x ?? ""
                        }
                    })}
                >
                    {label}
                </div>
            )}
        </>
    );
};