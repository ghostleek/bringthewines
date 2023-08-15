module.exports = {
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: (req) => {
            const allowedOrigins = ['http://localhost:3000', 'https://www.bringthewines.sg'];
            const origin = req.headers.origin || '';
            if (allowedOrigins.includes(origin)) {
              return [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: origin },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
              ];
            }
            return []; // Default response if origin is not in the allowed list
          }
        }
      ]
    }
  };