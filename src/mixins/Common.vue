<script>
  import api from '../lib/api';

  export default {
    methods : {
      read_then_set (model) {
        api(model + '/read', { key_by : 'name' })
          .then(r => {
            this.$set(this.list, model, r.data);
          });
      },
    },
  };
</script>
