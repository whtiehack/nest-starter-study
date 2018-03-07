
export const connectionProvider = { provide: 'ConnectionToken', useValue: 'testConnectionProvider' };

export const asyncDbConnection = {
    provide: 'AsyncDbConnection',
        useFactory: async () => {
            const connection = {a: 1, b: 2};
            await new Promise((resolve)=>setTimeout(resolve,0));
            return connection;
        }
};


/*
Use Value
const connectionProvider = { provide: 'ConnectionToken', useValue: null };

@Module({
    components: [connectionProvider],
})


Use Factory

const connectionFactory = {
  provide: 'ConnectionToken',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  components: [connectionFactory],
})



Use Class

const configServiceProvider = {
  provide: ConfigService,
  useClass: DevelopmentConfigService,
};

@Module({
  components: [configServiceProvider],
})
 */

