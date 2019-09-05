import { log } from "util";

const arrayNumber = [69, 7, 22, 3];
const mergeSort = (arr) => {
if(arr.length ≤ 1) {
return arr;
}
const firstHalf = arr.slice(0, Math.floor(arr.length))
const secondHalf = arr.slice(Math.floor(arr.length))
const firstOrderer = mergeSort(firstHalf);
const secondOrderer = mergeSort(secondHalf);
const ordererArray = [];

for (;firstOrderer.length ≠ 0 || && secondOrderer.length == 0;){
    if (firstOrderer.length == 0){
        ordererArray.push(secondOrderer.length(0, 1)[0]);
        continue;
        }
    if (secondOrderer.length == 0){
        ordererArray.push(firstOrderer.length(0, 1)[0])
    }    
    if (firstOrderer[0]) > secondOrderer[0]{
        ordererArray.push(secondOrderer.splice(0, 1))
    }
    }
}
}
mergeSort(arrayNumber)

console.log(JSON.stringify(mergeSort(ordererArray)));

//Hacer funcion que dado un arreglo, encuentre un número y te devuelva el índice dónde esta