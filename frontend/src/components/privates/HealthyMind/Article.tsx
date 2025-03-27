// import { Background } from "@assets/icons/Article";
import { BaseButton } from "@components/shares/Buttons";
import { CaretLeft } from "@assets/icons/Caret";
import articleData from "@assets/data/article.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ArticleProps = {
    id: number;
}

export const Article = ({ id }: ArticleProps) => {
    const navigate = useNavigate();
    const [article, setArticle] = useState<{ id: number; title: string; date: string; content: string; } | null>(null);
    const contentLines = article?.content.split("\n");

    useEffect(() => {
        const foundArticle = articleData.articles.find((article) => article.id === id);
        setArticle(foundArticle || null);
    }, [id]);
    

    return (
        <div className="flex flex-col justify-between px-5 pt-4 overflow-y-auto">
            <BaseButton 
                className="mr-4 mb-4"
                onClick={() => {
                    navigate("/");
                }}
            >
                <CaretLeft strokeClassName="stroke-brown-03" />

            </BaseButton>
            
            <div>
                <h1 className="text-[26px]">
                    <span className="text-2xl font-bold text-neutral-600">{article?.title}</span>
                </h1>
            </div>
            <div className="text-orange-01 pb-4" style={{ fontWeight: '600' }}>{article?.date}</div>
            <div style={{ textAlign: "justify" }}>
                {contentLines?.map((paragraph, index) => (
                    <p key={index} className="pb-4">{paragraph}</p>
                ))}
            </div>
            {/* <div className="fixed top-0" style={{ margin: 0 }}>
                <Background />
            </div> */}
        </div>
        );
}