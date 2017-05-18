class ZMenuModel
{
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