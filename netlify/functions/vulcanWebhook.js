exports.handler = async (event) => {
  try {
    // Safely parse the incoming request body
    const body = event.body ? JSON.parse(event.body) : {};
    const wallet = body.wallet?.toLowerCase();

    // List of banned wallets (all lowercase for consistency)
    const bannedWallets = [
      "0x229bc9afe9d1743ba0a2f929ff2e4e0184866f11",
      "0x4c6672e4a69585dba86412a03b585c856b12183f"
    ];

    // Handle missing wallet
    if (!wallet) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing wallet" })
      };
    }

    // Check if wallet is banned
    if (bannedWallets.includes(wallet)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false })
      };
    }

    // Allow all others
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("Webhook failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" })
    };
  }
};
