import React, { useEffect, useState } from "react";
import './QRCode.css';
import { useLocalSettings } from "../../hooks/useLocalSettings";

const QRCode = () => {
    const { theme } = useLocalSettings();
    const [ activeQrCode, setActiveQrCode ] = useState(false);

    const handleOpenQR = (e) => {
        e.stopPropagation();
        setActiveQrCode(true);
    };

    const handleCloseQR = (e) => {
        if (!activeQrCode) return;

        const isClickInside = e.target.closest('.qrcode_content_qr');
        if (!isClickInside) {
            setActiveQrCode(false);
        }

        // if (!e.target.closest('.qrcode')) {
        //     alert('click');
        //     // setActiveQrCode(false);
        // }
    };
    useEffect(() => {
        document.addEventListener('click', handleCloseQR);
        return () => {
            document.removeEventListener('click', handleCloseQR);
        }
    }, [activeQrCode]);
    

    return (
        <>
            <div className="qrcode">
                <div className="qrcode_content">
                    {!activeQrCode && (
                        <button className="qrcode_content_btn" onClick={handleOpenQR}>
                            <img src={require('../../assets/icons/qrcode.png')} className="qrcode_content_btn_img one" alt="" />
                            <img src={require('../../assets/icons/qrcode_hover.png')} className="qrcode_content_btn_img two" alt="" />
                        </button>
                    )}
                    {activeQrCode && (
                        <div className="qrcode_content_qr">
                            <img src={require(`../../assets/images/QR/qr_${theme}.png`)} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};
export default QRCode;