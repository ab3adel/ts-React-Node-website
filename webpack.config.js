
const path= require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin')
const nodeExternals= require('webpack-node-externals');
const webpack  = require('webpack');
const ExtractTextPlugin= require('mini-css-extract-plugin')

const browserConfig={
    entry:'./browser/main.tsx',
    mode:"development",
    target:'web',
     
    output:{
         path:path.resolve(__dirname,'./dist'),
         filename:'main.bundle.js',
         publicPath:'/',
    },

    resolve:{
        extensions:['.js','.tsx','.ts']
         },
    module:{
       rules: [
           {
        test:/\.tsx?$/,
        use:"ts-loader",
        exclude:'/node_modules/',
        
    },{
        test:/\.css$/,
        use: ["style-loader",
            'css-loader'
          ]
    },
    {
        test:/\.html$/,
        use:"html-loader"
    },
    {
        test:/\.(png|jpe?g|svg)$/,
        loader:"file-loader"
    },
   
]


    },
 
    plugins:[
        new webpack.DefinePlugin({
            __is_browser__:JSON.stringify(true),
        }),
        new ExtractTextPlugin({filename:'style.css'}),
         new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./dist/index.html') ,
            filename:'index.html'
           }),
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback:true
      },
    
};
const serverConfig={
    mode:"development",
    entry:"./src/server.ts",
    externals:[nodeExternals()],
    output:{
        filename:"server.js",
        path:path.resolve(__dirname,'./distServer'),
        publicPath:'/'
    },
    target:"node",
    resolve:{
        extensions:['.ts','.js','.tsx']},
      
    module:{
        rules:[
        {
            test:/\.tsx?$/,
            loader:"ts-loader",
            exclude:'/node_modules/'
        },{
            test:/\.css$/,
            use: [ExtractTextPlugin.loader
               ,'css-loader']
            
        },
        {
            test:/\.html$/,
            use:"html-loader"
        },
        {
            test:/\.(png|jpe?g|svg)$/,
            loader:"file-loader"
        },
       
    ]},
    plugins:[
         new webpack.DefinePlugin({
            __is_browser__:JSON.stringify(false)
        })
    ],
}
module.exports=browserConfig