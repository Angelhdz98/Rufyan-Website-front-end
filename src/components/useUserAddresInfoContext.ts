import { createContext, createElement, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { AddAddressCommand, AddressDomain } from "../types/typesIndex";

export interface UserAddrressContextState {
    userAddresses: {
        addresses: AddressDomain[];
        setUserAddrreses: Dispatch<SetStateAction<AddressDomain[]>>;
    };

    userAddressForm: {
        addressForm: AddAddressCommand;
        setAddressForm: Dispatch<SetStateAction<AddAddressCommand>>;
    };
}

export interface UserAddressInfoProviderProps {
    children: ReactNode;
    value: UserAddrressContextState;
}

const userAddressFormInitialState: AddAddressCommand = {
    userId: 0,
    streetName: "",
    extNumber: 0,
    city: "",
    country: "",
    isDefault: false,
    neighborhood: "",
    zipCode: "",
    intNumber: 0,
    state: "",
};

export const UserAddresInfoContext = createContext<UserAddrressContextState | undefined>(undefined);

export function UserAddressInfoProvider({ children, value }: UserAddressInfoProviderProps) {
    return createElement(
        UserAddresInfoContext.Provider,
        { value },
        children
    );
}

export function useUserAddressInfoContext() {
    const context = useContext(UserAddresInfoContext);

    if (!context) {
        throw new Error("useUserAddressInfoContext must be used within a UserAddressInfoProvider");
    }

    return context;
}

export { userAddressFormInitialState as userAddressFormInialState };


