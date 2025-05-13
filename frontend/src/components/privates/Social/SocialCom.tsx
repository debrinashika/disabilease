import { apiBase } from "@apis";
import { PrimaryButton } from "@components/shares/Buttons";
import { Edit } from "@assets/icons/Edit";
import { IApiBaseError } from "@interfaces/api";
import { ChangeEvent, useState } from "react";
import { PrimaryModal } from "@components/shares/Modals";
import toast from "react-hot-toast";
import { PrimaryInputText } from "@components/shares/Inputs";

export const SocialCom = () => {
    const apiBaseError = apiBase().error<IApiBaseError>();
    const [modalAddPingOpen, setModalAddPingOpen] = useState<boolean>(false);
    const [ping, setPing] = useState<string[]>([]);
    const [userPing, setUserPing] = useState<string>("");
    const [showDoctorPosts, setShowDoctorPosts] = useState<boolean>(false);

    // Dummy posts with images and text
    const dummyPosts = [
        {
            id: 1,
            text: "Anak saya usia 3 tahun baru bisa mengucapkan beberapa kata saja. Apakah ini normal?",
            image: "/images/child_talking.jpg",
            user: "Ibu Ani",
            time: "2 jam lalu"
        },
        {
            id: 2,
            text: "Ada yang punya rekomendasi terapis wicara di daerah Jakarta Selatan?",
            image: "/images/speech_therapy.jpg",
            user: "Budi Santoso",
            time: "5 jam lalu"
        },
        {
            id: 3,
            text: "Berbagi pengalaman: Anak saya dengan autisme menunjukkan perkembangan pesat setelah terapi rutin selama 6 bulan",
            image: "/images/happy_child.jpg",
            user: "Dewi Lestari",
            time: "1 hari lalu"
        }
    ];

    // Dummy doctor posts
    const doctorPosts = [
        {
            id: 1,
            text: "Tips mengenali tanda-tanda keterlambatan bicara pada anak. Perhatikan jika anak usia 2 tahun belum bisa mengucapkan 50 kata atau menggabungkan 2 kata.",
            image: "/images/doctor_tips.jpg",
            user: "Dr. Amelia",
            role: "Dokter Anak",
            time: "3 jam lalu"
        },
        {
            id: 2,
            text: "Webinar gratis 'Memahami Spektrum Autisme' akan diselenggarakan Sabtu depan. Daftar melalui link di bio saya. Terbuka untuk umum!",
            image: "/images/child_talking.jpg",
            user: "Dr. Budi",
            role: "Psikolog Anak",
            time: "1 hari lalu"
        },
        {
            id: 3,
            text: "Pentingnya deteksi dini tumbuh kembang anak. Kunjungi dokter anak secara rutin untuk memantau milestone perkembangan buah hati Anda.",
            image: "/images/happy_child.jpg",
            user: "Dr. Citra",
            role: "Dokter Spesialis Anak",
            time: "2 hari lalu"
        }
    ];

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

    const handleDoctorClick = () => {
        setShowDoctorPosts(true);
    };

    const handleBackToExplore = () => {
        setShowDoctorPosts(false);
    };

    return (
        <div className="overflow-y-auto h-full pb-20">
            {/* Community Menu */}
            {!showDoctorPosts && (
            <div className="mb-4 px-4">
                <h2 className="text-lg font-semibold text-gray-800">Community</h2>
                <div className="flex gap-4 overflow-x-auto mt-3">
                    {["Tanya Dokter", "Tumbuh Kembang", "Produk Rekomendasi"].map((item, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col items-center min-w-[130px] h-32 cursor-pointer ${item === "Tanya Dokter" && showDoctorPosts ? "border-b-2 border-purple-500" : ""}`}
                            onClick={item === "Tanya Dokter" ? handleDoctorClick : undefined}
                        >
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

                          
            <div className="border-t border-gray-200 mx-4 my-2"></div>

            </div>
            )}


            {/* Back button when in doctor posts view */}
            {showDoctorPosts && (
                <div className="px-4 mb-4">
                    <button 
                        onClick={handleBackToExplore}
                        className="flex items-center text-purple-01  text-sm font-medium"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Explore
                    </button>
                </div>
            )}

            {/* Explore Section */}
            <div className="px-4">
                {!showDoctorPosts ? (
                    <>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Explore DisaFriends</h2>
                        
                        {/* User Posts */}
                        {ping.map((ping, index) => (
                            <div key={index} className="mb-6 bg-white rounded-lg shadow-sm p-4">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                        <span className="text-xs font-medium text-purple-800">Y</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">You</p>
                                        <p className="text-xs text-gray-500">Just now</p>
                                    </div>
                                </div>
                                <p className="text-sm mb-3">{ping}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <button className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        0
                                    </button>
                                    <button className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        0
                                    </button>
                                    <button>Share</button>
                                </div>
                            </div>
                        ))}

                        {/* Dummy Posts */}
                        {dummyPosts.map(post => (
                            <div key={post.id} className="mb-6 bg-white rounded-lg shadow-sm p-4">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                        <span className="text-xs font-medium text-purple-800">{post.user.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{post.user}</p>
                                        <p className="text-xs text-gray-500">{post.time}</p>
                                    </div>
                                </div>
                                <p className="text-sm mb-3">{post.text}</p>
                                {post.image && (
                                    <img 
                                        src={post.image} 
                                        alt="Post" 
                                        className="w-full h-48 object-cover object-top rounded-lg mb-3"
                                    />
                                )}
                                <div className="flex justify-between text-xs text-gray-500">
                                    <button className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        12
                                    </button>
                                    <button className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        5
                                    </button>
                                    <button>Share</button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tanya Dokter</h2>
                        <p className="text-sm text-gray-600 mb-4">Postingan dari dokter dan profesional kesehatan kami</p>
                        
                        {/* Doctor Posts */}
                        {doctorPosts.map(post => (
                            <div key={post.id} className="mb-6 bg-white rounded-lg shadow-sm p-4">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                        <span className="text-xs font-medium text-blue-800">{post.user.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{post.user}</p>
                                        <p className="text-xs text-gray-500">{post.role} • {post.time}</p>
                                    </div>
                                </div>
                                <p className="text-sm mb-3">{post.text}</p>
                                {post.image && (
                                    <img 
                                        src={post.image} 
                                        alt="Post" 
                                        className="w-full h-48 object-cover object-top rounded-lg mb-3"
                                    />
                                )}
                                <div className="flex justify-between text-xs text-gray-500">
                                    <button className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        24
                                    </button>
                                    <button className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        8
                                    </button>
                                    <button>Share</button>
                                </div>
                            </div>
                        ))}

                     
                    </>
                )}
            </div>

            {/* Modal for Adding Ping */}
            <PrimaryModal
                open={modalAddPingOpen}
                setOpen={setModalAddPingOpen}
                apiBaseError={apiBaseError}
            >
                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <PrimaryInputText
                            id="ping_desc"
                            className="p-2 h-48 mb-4 text-xs text-top-0"
                            type="text"
                            placeholder={showDoctorPosts ? "Tulis pertanyaan Anda untuk dokter..." : "Share something to the social community..."}
                            value={userPing}
                            setValue={handlePingChange}
                        />

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Add Photo (Optional)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                            </div>
                        </div>

                        <PrimaryButton
                            text={showDoctorPosts ? "Kirim Pertanyaan" : "Post"}
                            className="bg-purple-01 hover:bg-purple-02 text-white py-2.5 font-semibold w-full"
                            onClick={addPing}
                        />
                    </div>
                </div>
            </PrimaryModal>
                

        <div className="absolute bottom-[92px] right-6 z-20">
            <PrimaryButton
                className="bg-purple-01 rounded-full p-4"
                type="icon-only"
                icon={<Edit/>}
                onClick={() => setModalAddPingOpen(true)}
            />
        </div>
        
        </div>
    );
};