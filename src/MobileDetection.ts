namespace MobileDetection {
    export const isMobile = /android|blackberry|iemobile|ipad|iphone|ipod|opera mini/i.test(navigator.userAgent);
}

export default MobileDetection;
