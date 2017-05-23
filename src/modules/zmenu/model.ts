class ZMenuModel
{
    constructor(){
        this.menu = new Array<ZMenuItemModel>();
    }

    menu: Array<ZMenuItemModel>;
}

class ZMenuItemModel
{
    nom: string;
    desc: string;
    ctx: string;
    desh: number;
    menu: Array<ZMenuItemModel>;
}

export
{
    ZMenuModel,
    ZMenuItemModel
}