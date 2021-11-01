export class Categories{
    public id: string;
    public name: string;
    public type: string;
    public slug: string;
    public key: string;

    constructor()
    constructor(obj: Categories)
    constructor(obj?: any){
        this.id = obj?.id || "";
        this.key = obj?.key || "";
        this.name = obj?.name || "";
        if (obj?.type != 'product' && obj?.type != 'blog') this.type = "";
        else this.type = obj?.type
        this.slug = obj?.slug || ""
    }
}