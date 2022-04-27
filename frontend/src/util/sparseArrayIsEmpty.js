export const checkIfEmpty = (arr) => {
    let isEmpty = true;
    if (arr.length === 0) {
      isEmpty = true;
    }

    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        isEmpty = false;
      }
    }
    return isEmpty;
  };