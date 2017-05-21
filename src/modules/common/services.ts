class MapServices<TKey, TValue>
{
    public getMapIndexByKey(map:Map<TKey, TValue>, key:TKey){

        if(!map.has(key)){
            return -1;
        }

        let keysIterable: IterableIterator<TKey> = map.keys();
        for (let i = 0; i < map.size; i++) {
            let keyI: TKey = keysIterable.next().value;
            if(key == keyI){
                return i;
            }
        }        
        
        return -1;
    }
}

export
{
    MapServices
}