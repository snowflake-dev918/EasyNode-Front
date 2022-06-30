
export const displayAddress = (address: string) => {
    return `${address.substring(0, 4)} ... ${address.substring(39)}`;
};

export const getImages = (url: string) => {
    return require(`../assets/image/${url}`).default;
}

export const getFormattedText = (value: any) => {
    value = value + '';
    if (value.length === 1) {
        return '0' + value;
    } else {
        return value;
    }
}

export const formatTime = (time: number) => {
    var date = new Date(time * 1000);
    return date.toDateString();
  };