import { ref } from 'vue';

export const useMix = () => {
    const res = ref();

    const timer = (data, time) => {
        setTimeout(() => {
            data.value = null;
        }, time);
    };

    return {
        res,
        timer
    };    
};

