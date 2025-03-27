import { apiBase } from "@apis";
import { PrimaryButton } from "@components/shares/Buttons";
import { Edit } from "@assets/icons/Edit";
import { Ping } from './Ping';
import { IApiBaseError } from "@interfaces/api";
import { ChangeEvent, useState } from "react";
import { PrimaryModal } from "@components/shares/Modals";
import toast from "react-hot-toast";
import { PrimaryInputText } from "@components/shares/Inputs";


export const SocialCom = () => {
    const apiBaseError = apiBase().error<IApiBaseError>();

    // PING
    const [modalAddPingOpen, setModalAddPingOpen] = useState<boolean>(false);
    const [ping, setPing] = useState<string[]>([]);;
    const [userPing, setUserPing] = useState<string>("")

    const handlePingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserPing(event.target.value);
      };

    const addPing = () => {
        if (userPing.trim() === "") {
            toast.error("Message is empty");
            return;
        }

        const newPing = userPing;
        setPing(prevPing => [...prevPing, newPing]);
        setUserPing("");

        setModalAddPingOpen(false);
    };

    return (
        <div className= "overflow-y-auto h-max">
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
                    className="bg-purple-01 rounded-full p-3 drop-shadow-fab"
                    type="icon-only"
                    icon={<Edit/>}
                    onClick={() => setModalAddPingOpen(true)}
                />
            </div>

            {ping.map((ping, index) => (
                <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    <Ping key={index} text={ping} />
                </div>
            ))}
        </div>
    )
}