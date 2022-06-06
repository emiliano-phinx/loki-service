import { Controller, Get, Post, Body, Param } from "@nestjs/common"
import { ChatService } from "./chat.service"

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  findAllChats(@Param("token") token: string) {
    return this.chatService.findAllChats(token)
  }

  @Post("/reply")
  replyOne(
    @Param("token") token: string,
    @Param("idConversation") idConversation: string,
    @Param("idAdmin") idAdmin: string,
    @Body("body") body: string,
  ) {
    return this.chatService.replyConversation(
      token,
      idConversation,
      idAdmin,
      body,
    )
  }
}
