import * as linkify from "linkifyjs";

interface HintPiece {
    text: string;
    href: string | null;
}

export default class HintLinkifier {
    static linkify(s: string) {
        const pieces: HintPiece[] = [];
        const links = linkify.find(s);

        pieces.push({ text: s.substring(0, links[0]?.start), href: null });

        for (let i = 0; i < links.length; i++) {
            pieces.push(
                { text: links[i].value, href: links[i].href },
                { text: s.substring(links[i].end, links[i + 1]?.start), href: null }
            );
        }

        return pieces.filter((piece) => piece.text.length > 0);
    }
};
