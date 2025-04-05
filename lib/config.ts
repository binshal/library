const config = {
    env: {
      apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000',
      imagekit: {
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '', // This should be server-side only
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
      },
      databaseUrl : process.env.DATABASE_URL || '',
    }
  };
  
  export default config;