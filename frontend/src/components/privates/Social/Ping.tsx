import { Ava } from "@assets/icons/Profile";
import { OneDot } from "@assets/icons/Dots";
import { Love, Comment, Share } from "@assets/icons/Reaction";
import { PrimaryButton } from "@components/shares/Buttons";

type PingPropType = {
    // user?: string
    text: string
    // time: string
    // likes: int
    // reply: int
};
  
export const Ping = ({ text }: PingPropType) => {
    return (
        <div className="flex flex-row">
            <div className="ml-2">
                <Ava/>
            </div>
            <div className="ml-4 flex flex-col">
                <div className="flex flex-row mt-1">
                    {/* username */}
                    <p className="text-[#F19877] font-semibold">aku user</p>
                    <div className="mt-1 ml-4" style={{ transform: 'scale(0.5)' }}>
                        <OneDot/>
                    </div>
                    <div className="ml-2 text-[#707070]">
                        {/* time */}
                        just now
                    </div>
                </div>
                <div className = "py-4" style={{ overflowWrap: 'break-word' , maxWidth: '100%'}}>
                    { text }
                </div>
                <div className = "flex flex-row py-2 ml-40 justify-center items-center">
                    <PrimaryButton
                        className="drop-shadow-fab"
                        type="icon-only"
                        icon={<Love fillClassName="fill-neutral-400"/>}
                        // onClick={}
                    />
                    <div className="mr-2">15</div>
                    <PrimaryButton
                        className="drop-shadow-fab"
                        type="icon-only"
                        icon={<Comment strokeClassName="stroke-neutral-400"/>}
                        // onClick={}
                    />
                    <div className="mr-2">10</div>
                    <PrimaryButton
                        className="drop-shadow-fab"
                        type="icon-only"
                        icon={<Share fillClassName="fill-neutral-400"/>}
                        // onClick={}
                    />
                </div>
            </div>
        </div>
    )
}