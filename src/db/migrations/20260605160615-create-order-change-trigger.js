'use strict';
module.exports = {
  async up(queryInterface) {

    await queryInterface.sequelize.query(`
     CREATE OR REPLACE FUNCTION notify_order_changes()
RETURNS TRIGGER AS $$
BEGIN

    IF TG_OP = 'DELETE' THEN

        PERFORM pg_notify(
            'order_changes',
            json_build_object(
                'operation', TG_OP,
                'id', OLD.id,
                'status', OLD.status,
                'customer_name',OLD.customer_name,
                'product_name',OLD.product_name,
            )::text
        );

        RETURN OLD;

    ELSE

        PERFORM pg_notify(
            'order_changes',
            json_build_object(
                'operation', TG_OP,
                'id', NEW.id,
                'status', NEW.status,
                 'customer_name',NEW.customer_name,
                'product_name',NEW.product_name,
            )::text
        );

        RETURN NEW;

    END IF;

END;
$$ LANGUAGE plpgsql;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER orders_change_trigger
      AFTER INSERT OR UPDATE OR DELETE
      ON orders
      FOR EACH ROW
      EXECUTE FUNCTION notify_order_changes();
    `);
  },

  async down(queryInterface) {

    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS orders_change_trigger ON orders;
    `);

    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS notify_order_changes();
    `);
  }
};
