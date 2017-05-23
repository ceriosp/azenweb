class MapServices<TKey, TValue>
{
    public getMapIndexByKey(map:Map<TKey, TValue>, key:TKey){

        if(!map){
            return -1;
        }

        if(!map.has(key)){
            return -1;
        }

        let keyI: TKey;
        let keysIterable: IterableIterator<TKey> = map.keys();
        for (let i = 0; i < map.size; i++) {
            keyI = keysIterable.next().value;
            if(key == keyI){
                return i;
            }
        }        
        
        return -1;
    }

    public getElementByIndex(map:Map<TKey, TValue>, index:number):TValue
    {
        if(!map){
            return null;
        }

        if(index < 0){
            return null;
        }

        if(index >= map.size){
            return null;
        }

        let valueI: TValue;
        let valuesIterable: IterableIterator<TValue> = map.values();
        for (let i = 0; i < map.size; i++) {
            valueI = valuesIterable.next().value;
            if(i == index){
                return valueI;
            }
        }

        return null;
    }
}

export
{
    MapServices
}