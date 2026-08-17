import { useEffect } from "react";

const SITE_NAME = "Jovial Duplex";
const DEFAULT_TITLE = "Jovial Duplex — Full-Stack Web Developer Portfolio";
const DEFAULT_DESCRIPTION =
    "Portfolio of Jovial Duplex, a full-stack web developer based in Douala, Cameroon. Explore my projects, services and skills, and get in touch to bring your ideas to life.";

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

function upsertMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!content) {
        if (el) el.remove();
        return;
    }
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function upsertCanonical(url) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
    }
    link.setAttribute("href", url);
}

function upsertJSONLD(id, data) {
    let script = document.getElementById(id);
    if (!data) {
        if (script) script.remove();
        return;
    }
    if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
}

export default function usePageMeta({
    title,
    description,
    image = "/logo.png",
    type = "website",
    keywords,
    url,
    jsonLd,
}) {
    const pathname = window.location.pathname;

    useEffect(() => {
        const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
        const pageDescription = description || DEFAULT_DESCRIPTION;
        const absoluteUrl = url || (BASE_URL + pathname);
        const absoluteImage = /^https?:\/\//i.test(image) ? image : BASE_URL + image;

        document.title = pageTitle;

        upsertMeta("name", "description", pageDescription);
        upsertMeta("name", "keywords", keywords);
        upsertMeta("property", "og:title", pageTitle);
        upsertMeta("property", "og:description", pageDescription);
        upsertMeta("property", "og:type", type);
        upsertMeta("property", "og:url", absoluteUrl);
        upsertMeta("property", "og:image", absoluteImage);
        upsertMeta("property", "og:image:alt", pageTitle);
        upsertMeta("property", "og:site_name", SITE_NAME);
        upsertMeta("name", "twitter:card", "summary_large_image");
        upsertMeta("name", "twitter:title", pageTitle);
        upsertMeta("name", "twitter:description", pageDescription);
        upsertMeta("name", "twitter:image", absoluteImage);

        upsertCanonical(absoluteUrl);
        upsertJSONLD("page-jsonld", jsonLd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, image, type, keywords, url, pathname, JSON.stringify(jsonLd)]);
}

export { SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, BASE_URL };
