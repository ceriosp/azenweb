
class MapServices<TKey, TValue>
{
    public getMapIndexByKey(map: Map<TKey, TValue>, key: TKey) {

        if (!map) {
            return -1;
        }        

        if (!map.has(key)) {
            return -1;
        }

        let keyI: TKey;
        let keysIterable: IterableIterator<TKey> = map.keys();
        for (let i = 0; i < map.size; i++) {
            keyI = keysIterable.next().value;
            if (key == keyI) {
                return i;
            }
        }

        return -1;
    }

    public getElementByIndex(map: Map<TKey, TValue>, index: number): TValue {
        if (!map) {
            return null;
        }

        if (index < 0) {
            return null;
        }

        if (index >= map.size) {
            return null;
        }

        let valueI: TValue;
        let valuesIterable: IterableIterator<TValue> = map.values();
        for (let i = 0; i < map.size; i++) {
            valueI = valuesIterable.next().value;
            if (i == index) {
                return valueI;
            }
        }

        return null;
    }

    addNewElementAtBeginingImmutableWay(key: TKey, value: TValue, sourceMap: Map<TKey, TValue>): Map<TKey, TValue> {

        let resultMap = new Map<TKey, TValue>();

        if (!sourceMap) {
            return resultMap;
        }

        resultMap.set(key, value);

        sourceMap.forEach((sourceValue: TValue, sourceKey: TKey) => {
            resultMap.set(sourceKey, Object.assign({}, sourceValue));
        });

        return resultMap;
    }

    updateAndPutFirstElementImmutableWay(key: TKey, updateAllMapValuesFn: () => Map<TKey, TValue>, updateValueFn: () => TValue): Map<TKey, TValue> {

        let resultMap = new Map<TKey, TValue>();

        if (typeof updateAllMapValuesFn == "function") {
                        
            let updatedMap = updateAllMapValuesFn();
            resultMap.set(key, Object.assign({}, updateValueFn()));
            updatedMap.forEach((valueI: TValue, keyI:TKey) => {
                if(keyI == key){
                    return true;
                }
                resultMap.set(keyI, valueI);
            });
            if (!resultMap || !resultMap.has(key)) {
                return new Map<TKey, TValue>();
            }
        }

        return resultMap;
    }
}

export {
    MapServices
}