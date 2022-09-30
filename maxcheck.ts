// import { CookieMap } from "cookiefile"

const LI_AT = "AQEIACMHOY5svgUA7OQAAAGDhhW4GQAAAYOqIjwZTgAAAAAAAAAAADBGAiEAtOnO2QqIS8ZOgdtwrcC0-hqpFjjc_pL_-t2YtmpXficCIQClvXsJZGeWaSBXdP9-YMIRY8ObqiRizA4LM8G_ndUz8RNx-uFh_kUH0eQ9kYFCxtaCd-ki"
const JSESSIONID = `"ajax:3486187429940509631"`

function getLinkedinHeaders() {

    // const cookieMap = new CookieMap('/users/linusbolls/downloads/cookies-www-linkedin-com.txt')

    // const cookies = cookieMap.toRequestHeader().replace('Cookie: ', '')

    return {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
        "Accept": "application/vnd.linkedin.normalized+json+2.1",
        "Accept-Language": "en-US,en;q=0.5",
        "x-li-lang": "en_US",
        "x-li-track": "{\"clientVersion\":\"1.11.1525\",\"mpVersion\":\"1.11.1525\",\"osName\":\"web\",\"timezoneOffset\":2,\"timezone\":\"Europe/Berlin\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":2,\"displayWidth\":2880,\"displayHeight\":1800}",
        "x-li-page-instance": "urn:li:page:d_flagship3_background;shOUw44aQ6GX+oRpdHGatg==",
        "csrf-token": "ajax:3486187429940509631",
        "x-restli-protocol-version": "2.0.0",
        "x-li-prefetch": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-GPC": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        Cookie: `li_at=${LI_AT}; JSESSIONID=${JSESSIONID}`
    }
}

async function getNumConnections() {

    const res = await fetch("https://www.linkedin.com/voyager/api/relationships/connectionsSummary", {
        headers: getLinkedinHeaders(),
        referrer: "https://www.google.com/",
        method: "GET",
        mode: "cors"
    });

    if (!res.ok) {
        console.error("request failed, please refresh session token")

        return
    }
    const data = await res.json()

    return data.data.numConnections
}
async function main() {

    const numConnections = await getNumConnections()

    console.log("current max balance:", numConnections)
}
main()