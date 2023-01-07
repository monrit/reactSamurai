export function changePropsInObjArray(array, itemProp, toEqual, properties) {
    return array.map(item => {
        if (item[itemProp] === toEqual) {
            return {
                ...item,
                ...properties
            };
        }
        return item;
    });
}