export type ClassFromType ={
    title?:string,
    description?:string
}

export type ClassFromTypeError ={
    title?:string,
    description?:string,
    expire_at?:string,
    image?:string
}
export type ClashType ={
    id:number,
    user_id:number
    title?:string,
    description?:string,
    expire_at?:string ,
    image?:string,
    ClashItem:Array<ClashItem>,
    ClashComments:Array<ClashComments>,
}

export type ClashItemForm = {
    image: File | null,

}

export type ClashItem ={
    id:number,
    count:number,
    image:string
}

export type ClashComments ={
    id:number,
    comment:number,
    created_at:string
}










