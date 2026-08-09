import React from "react";
import './Clients.css';
import { CLIENTS } from "../../hooks/data";
import ClientCard from "./ClientCard/ClientCard";

const Clients = () => {
    return (
        <>
            
            <div className="clients">
                <div className="container">
                    <div className="clients_content">
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
        </>
    )
};
export default Clients;