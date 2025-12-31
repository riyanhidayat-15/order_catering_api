import { Sequelize } from "sequelize";

const db = new Sequelize("system_catering_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 20,
    min: 5,
    acquire: 60000,
    idle: 10000,
    evict: 10000,
  },

  dialectOptions: {
    connectTimeout: 60000,
  },
  query: {
    timeout: 30000,
  },

  retry: {
    max: 3,
    timeout: 3000,
  },

  logging: (sql, timing) => {
    if (timing && timing > 1000) {
      console.warn(`⚠️ SLOW QUERY (${timing}ms):`, sql.substring(0, 150));
    }
  },

  timezone: "+07:00",

  define: {
    timestamps: true,
    underscored: false,
    freezeTableName: true,
  },
});

export default db;
