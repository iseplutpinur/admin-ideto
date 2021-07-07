$(function () {
  $("#example1").DataTable({
    "responsive": true,
    "lengthChange": true,
    "autoWidth": false,
    // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    fixedHeader: true
  }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)')
});