export enum EnumStatus{
    todo='todo',
    inProgress='in-progress',
    produced='produced',
    done='done',
}


export interface IBaseField{
    $id: string;
    $createdAt: string;
}


export interface IComment extends IBaseField{
    text: string;
}

export interface IDeal extends IBaseField{
    name:string;
    description:string;
    status:EnumStatus;
    comments?:IComment[];
}

export interface IColumn{
    status:EnumStatus;
    name: string;
    items:IDeal[];
}

export interface ICreateDeal{
    name: string;
    description: string;
    status:string;
    user_id:string;
}