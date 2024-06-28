export const formatLargeValueToShorthand = (count: number): string => {
    if (count < 100){
        return count + ""
    }else if (count < 1000){
        return `${(count / 100).toFixed(1)}K`
    }else if (count < 1000000){
        return `${(count / 1000).toFixed(1)}K`
    }else if (count >= 1000000){
      return `${(count / 1000000).toFixed(1)}M`
    }
    return count + ""
  }