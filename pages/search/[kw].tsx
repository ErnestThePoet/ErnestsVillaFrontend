import Head from "next/head";
import { Empty } from "antd";
import { useState, useEffect } from "react";
import NavBar from "../../components/nav-bar";
import SiteBkg from "../../components/site-bkg";
import SiteFooter from "../../components/site-footer";
import { tryAutoLogin } from "../../logics/common";
import * as L from "../../logics/search";
import styles from "../../styles/search.module.scss";
import SearchRow from "../../components/search-row";
import { useRouter } from "next/router";
import SingleSearchResult from "../../components/single-search-result";
import type { SingleItemPreview } from "../../modules/types";
import userData from "../../states/user-data";

export default function SearchResultPage() {
    const router = useRouter();

    const [results, setResults] = useState<SingleItemPreview[]>([]);

    const submitSearch = () => {
        if (router.isReady && userData.isLoggedIn) {
            L.submitSearch(router.query.kw as string, setResults);
        }
    };

    useEffect(() => {
        tryAutoLogin(submitSearch);
    }, []);

    useEffect(() => {
        submitSearch();
    }, [router.query]);

    return (
        <div className="overflow-x-hidden">
            <Head>
                <title>{router.query.kw ?? ""}的搜索结果 - 云安电子商城</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className={styles.divContentWrapper}>
                    <SearchRow />

                    {results.length === 0 ? (
                        <div className={styles.divEmptyWrapper}>
                            <Empty description="未搜索到任何商品" />
                        </div>
                    ) : (
                        <div className={styles.divItemShowWrapper}>
                            {results.map((x, i) => (
                                <SingleSearchResult key={i} item={x} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
