import React from "react";
import './Clients.css';
import { CLIENTS } from "../../hooks/data";
import ClientCard from "./ClientCard/ClientCard";
import { useLocalSettings } from "../../hooks/useLocalSettings";

const Clients = () => {
    const { lang } = useLocalSettings();

    return (
        <>
            
            <div className="clients">
                <div className="container">
                    <div className="clients_content">
                        <div className="clients_content_title title bold">
                            {lang === 'ru'
                                ? 'Наши клиенты'
                                : 'Our clients'
                            }
                        </div>
                        <div className="clients_content_cards">
                            {CLIENTS.map((item) => (
                                <ClientCard
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Clients;