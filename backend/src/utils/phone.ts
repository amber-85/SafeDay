import {parsePhoneNumberFromString} from "libphonenumber-js";

export const normalizePhoneNumber=(phone:string):string|null=>{
    const phoneNumber=parsePhoneNumberFromString(phone,"SE");
    
    if(!phoneNumber || !phoneNumber.isValid()){
        return null;
    };

    return phoneNumber.number;
}