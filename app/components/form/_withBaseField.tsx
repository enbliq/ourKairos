import React from "react";
import {
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import Toggle from "./Toggle";

export interface BaseFieldProps {
  children: React.ReactNode;
  standalone?: boolean;
  label?: string;
  details?: string;
  optional?: boolean;
  toggleable?: boolean;
  toggleDefault?: boolean;
}

type BaseProps<T extends FieldValues> = Omit<BaseFieldProps, "children"> &
  UseControllerProps<T>;

export default function withBaseField<
  T extends FieldValues,
  P extends BaseProps<T>,
>(Component: React.ComponentType<P>): React.ComponentType<P> {
  const wrapper = function WithLoadingComponent(props: P) {
    if (props.standalone === true) {
      return <Component {...props} />;
    }

    return (
      <BaseField {...props}>
        <Component {...props} />
      </BaseField>
    );
  };

  return wrapper;
}

function BaseField<T extends FieldValues>(
  props: BaseFieldProps & UseControllerProps<T>,
) {
  const {
    children,
    details,
    label,
    name,
    optional = false,
    toggleable = false,
  } = props;

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const toggleName = `toggle-${name}`;
  const toggle = watch(toggleName);

  const error = errors[props.name];

  return (
    <div>
      <label className="flex flex-col gap-2.5">
        <div className="flex text-sm">
          <div className="grow">
            <span className="font-semibold text-xl font-kumbhSans">
              {label} {optional && "(Optional)"}
              {!!details && ":"}
            </span>
            {details && (
              <span className="text-base font-medium text-[#3C3C3C] font-kumbhSans">
                {" "}
                {details}
              </span>
            )}
          </div>
          {toggleable && (
            <Toggle
              {...register(toggleName)}
              name={toggleName}
              standalone
              optional
            />
          )}
        </div>
        {(!toggleable || toggle) && children}
      </label>
      <div className="text-red-600 text-sm h-5 w-full my-1">
        {error?.message as string}
      </div>
    </div>
  );
}
