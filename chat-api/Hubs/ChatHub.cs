using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<string, string> ConnectedUsers = new();

        public override async Task OnConnectedAsync()
        {
            var userName = Context.User?.Identity?.Name ?? Context.ConnectionId;
            ConnectedUsers.AddOrUpdate(userName, Context.ConnectionId, (key, oldValue) => Context.ConnectionId);

            await Clients.All.SendAsync("UserConnected", userName);
            await Clients.Caller.SendAsync("ConnectedUsers", ConnectedUsers.Keys);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var username = ConnectedUsers.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
            if (username != null)
            {
                ConnectedUsers.TryRemove(username, out _);
                await Clients.All.SendAsync("UserDisconnected", username);
            }

            await base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendPrivateMessage(string toUsername, string message)
        {
            if (ConnectedUsers.TryGetValue(toUsername, out var connectionId))
            {
                var fromUsername = Context.User?.Identity?.Name ?? "Inconnu";
                await Clients.Client(connectionId).SendAsync("ReceivePrivateMessage", fromUsername, message);
            }
        }
    }
}
