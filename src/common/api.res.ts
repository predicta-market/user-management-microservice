function createGenericResponse(success:boolean, message:string,data:any, error:any){
    return {
        success: success,
        message: message,
        data: data,
        error: error,
    };
}

export function ErrorResponse(error:any){
    return createGenericResponse(false,'Something went wrong',{},error);
}

export function SuccessResponse(data:any){
    if(data.phoneNumber){
        data.phoneNumber = data.phoneNumber.toString();
    }
    return createGenericResponse(true,'Successfully completed the request',data,{});
}