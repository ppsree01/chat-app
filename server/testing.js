let a = () => {
    let sum = 0;
    for(let i = 0; i< 1000*1000 *1000; i++) {
        if (i == 1000) {
            setTimeout(() => console.log("First"), 0);
        }
        if (i == 1000 * 1000 * 999) {
            console.log("Second")
        }
        sum += i;
    }
    return sum
}
a();