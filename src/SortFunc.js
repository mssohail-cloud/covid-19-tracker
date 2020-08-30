import numeral from "numeral";


export const SortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b) => {
        if(a.cases > b.cases){
            return -1;
        }else {
            return 1;
        }
    });
    return sortedData;
}

export const PrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";