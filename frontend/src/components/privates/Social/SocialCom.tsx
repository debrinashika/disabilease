import { apiBase } from "@apis";
import { PrimaryButton } from "@components/shares/Buttons";
import { Edit } from "@assets/icons/Edit";
import { IApiBaseError } from "@interfaces/api";
import { ChangeEvent, useState } from "react";
import { PrimaryModal } from "@components/shares/Modals";
import toast from "react-hot-toast";
import { PrimaryInputText } from "@components/shares/Inputs";
import { Ping } from './Ping';

export const SocialCom = () => {
    const apiBaseError = apiBase().error<IApiBaseError>();
    const [modalAddPingOpen, setModalAddPingOpen] = useState<boolean>(false);
    const [ping, setPing] = useState<string[]>([]);
    const [userPing, setUserPing] = useState<string>("");

    const handlePingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserPing(event.target.value);
    };

    const addPing = () => {
        if (userPing.trim() === "") {
            toast.error("Message is empty");
            return;
        }
        setPing(prevPing => [...prevPing, userPing]);
        setUserPing("");
        setModalAddPingOpen(false);
    };

    return (
        <div className="overflow-y-auto h-full  ">
            {/* Community Menu */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Community</h2>
                <div className="flex gap-4 overflow-x-auto mt-3">
                    {["Tumbuh Kembang", "Tanya Dokter", "Produk Rekomendasi"].map((item, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[130px] h-32 ">
                            <div className="w-full flex items-center justify-center h-100">
                            <img
                            src={`/icons/${item.toLowerCase().replace(/ /g, "_")}.png`}
                            alt={item}
                            className="w-80"
                            />

                            </div>
                            <span className="text-xs text-gray-800 mt-2 text-center whitespace-nowrap">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Explore DisaFriends</h2>
            {/* Modal for Adding Ping */}
            <PrimaryModal
                open = { modalAddPingOpen }
                setOpen = { setModalAddPingOpen }
                apiBaseError= { apiBaseError }
            >
                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <PrimaryInputText
                            id="ping_desc"
                            className="p-2 h-48 mb-4 text-xs text-top-0"
                            type="text"
                            placeholder="Share something to the social community!"
                            value={ userPing }
                            setValue={ handlePingChange }
                            // error={apiBaseError.getErrors("task_name")?.[0].toString()}
                        />

                        <PrimaryButton
                            text="Add"
                            className="bg-purple-01 text-neutral-0 py-2.5 font-semibold w-full"
                            onClick={ addPing }
                        />
                    </div>
                </div>
            </PrimaryModal>
                
            <div className="absolute bottom-[92px] right-6 z-20">
                <PrimaryButton
                    className="bg-purple-01 rounded-full p-3 "
                    type="icon-only"
                    icon={<Edit/>}
                    onClick={() => setModalAddPingOpen(true)}
                />
            </div>

            
            {/* Posts Feed */}
            {ping.map((ping, index) => (
                <div key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <Ping key={index} text={ping} />
                </div>
            ))}
        </div>
    );
};