import { Injectable } from "@nestjs/common"
import { ReplyToConversationMessageType, Order, SortBy } from "intercom-client"
import { Client } from "intercom-client"

@Injectable()
export class ChatService {
  findAllChats = async (token) => {
    const client = new Client({
      tokenAuth: {
        token: token,
      },
    })
    const response = await client.conversations.list({
      order: Order.DESC,
      sort: SortBy.UpdatedAt,
      page: 1,
      perPage: 10,
    })
    return response
  }

  replyConversation = async (
    token: string,
    idConversation: string,
    idAdmin: string,
    bodyMessage: string,
  ) => {
    try {
      const client = new Client({
        tokenAuth: {
          token: token,
        },
      })
      const response = await client.conversations.replyByIdAsAdmin({
        id: idConversation,
        adminId: idAdmin,
        messageType: ReplyToConversationMessageType.COMMENT,
        body: bodyMessage,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}
