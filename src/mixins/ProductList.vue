<script>
  // import api from '../lib/api';

  export default {
    methods : {
      get_thumbnail (row) {
        return row.preview && row.preview[ 0 ] && row.preview[ 0 ].url ?
               row.preview[ 0 ].url :
               'https://upload-images.jianshu.io/upload_images/13340525-1244fa2dcf49ee65.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240';
      },
    },
  };</script>
