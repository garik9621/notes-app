<script setup lang="ts">
import { NotesList } from '@widgets/notes-list';
import { AddNoteManagement } from "@widgets/add-note-management";
</script>

<template>
  <main>
    <add-note-management />

    <notes-list />
  </main>
</template>
