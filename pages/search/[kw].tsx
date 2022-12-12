import Head from "next/head";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import NavBar from "../../components/nav-bar";
import SiteBkg from "../../components/site-bkg";
import SiteFooter from "../../components/site-footer";
import { tryAutoLogin } from "../../logics/common";
import * as L from "../../logics/search";
import styles from "../../styles/components/search.module.scss";
import SearchRow from "../../components/search-row";
import { useRouter } from "next/router";
import searchResultData from "../../states/search-result-data";
import SingleSearchResult from "../../components/single-search-result";

export default observer(function SearchResultPage() {
    const router = useRouter();

    useEffect(() => {
        tryAutoLogin(undefined, false);
    }, []);

    useEffect(() => {
        if (router.isReady) {
            L.submitSearch(router.query.kw as string);
        }
    }, [router.query]);

    return (
        <div className="overflow-x-hidden">
            <Head>
                <title>云安电子商城</title>
            </Head>

            <NavBar />

            <main className={styles.main}>
                <SiteBkg />

                <div className={styles.divContentWrapper}>
                    <SearchRow />

                    <div className={styles.divItemShowWrapper}>
                        {searchResultData.results.map((x, i) => (
                            <SingleSearchResult key={i} item={x} />
                        ))}
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
});
