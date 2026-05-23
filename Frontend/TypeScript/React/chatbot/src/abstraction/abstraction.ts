import type { ReactElement } from "react";

export interface ChatMessageType {
    message: (string | ReactElement<HTMLImageElement>)
    sender:   string
    id:       string
}

// export interface Props {
//     message?:      (string | ReactElement<HTMLImageElement>)
//     sender?:        string
//     id?:            string
//     dependencies?:  ChatMessageType[]
//     chatMessages?:  ChatMessageType[]
// }