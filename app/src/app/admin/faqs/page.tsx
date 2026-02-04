"use client";

import { useState } from "react";
import { mockFAQs } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/types";
import {
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Save,
  X,
  RotateCcw,
} from "lucide-react";

type EditingFAQ = Omit<FAQ, "id" | "created_at"> & { id?: string };

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [editing, setEditing] = useState<EditingFAQ | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletedFaqs, setDeletedFaqs] = useState<FAQ[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);

  const activeFaqs = faqs
    .filter((f) => !deletedFaqs.find((d) => d.id === f.id))
    .sort((a, b) => a.order - b.order);

  function handleAdd() {
    setEditingId(null);
    setEditing({
      question: "",
      answer: "",
      order: activeFaqs.length + 1,
      published: true,
    });
  }

  function handleEdit(faq: FAQ) {
    setEditingId(faq.id);
    setEditing({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      published: faq.published,
    });
  }

  function handleSave() {
    if (!editing || !editing.question.trim() || !editing.answer.trim()) return;

    if (editingId) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? {
                ...f,
                question: editing.question,
                answer: editing.answer,
                order: editing.order,
                published: editing.published,
              }
            : f
        )
      );
    } else {
      const newFaq: FAQ = {
        id: `faq-${Date.now()}`,
        question: editing.question,
        answer: editing.answer,
        order: editing.order,
        published: editing.published,
        created_at: new Date().toISOString(),
      };
      setFaqs((prev) => [...prev, newFaq]);
    }
    setEditing(null);
    setEditingId(null);
  }

  function handleDelete(faq: FAQ) {
    setDeletedFaqs((prev) => [...prev, faq]);
  }

  function handleRestore(faq: FAQ) {
    setDeletedFaqs((prev) => prev.filter((d) => d.id !== faq.id));
  }

  function togglePublished(faq: FAQ) {
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === faq.id ? { ...f, published: !f.published } : f
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">FAQ Management</h2>
          <p className="text-slate-500 mt-1">
            Manage the frequently asked questions shown on the public FAQ page.
          </p>
        </div>
        <div className="flex gap-2">
          {deletedFaqs.length > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowDeleted(!showDeleted)}
            >
              <Trash2 size={16} className="mr-2" />
              Deleted ({deletedFaqs.length})
            </Button>
          )}
          <Button variant="primary" onClick={handleAdd}>
            <Plus size={16} className="mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
              <HelpCircle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {activeFaqs.length}
              </p>
              <p className="text-xs text-slate-500">Total FAQs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
              <Eye size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {activeFaqs.filter((f) => f.published).length}
              </p>
              <p className="text-xs text-slate-500">Published</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center text-gold-600">
              <EyeOff size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {activeFaqs.filter((f) => !f.published).length}
              </p>
              <p className="text-xs text-slate-500">Drafts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit/Add Form */}
      {editing && (
        <Card className="border-primary-200 bg-primary-50 animate-scale-in">
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit FAQ" : "Add New FAQ"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={editing.question}
                    onChange={(e) =>
                      setEditing({ ...editing, question: e.target.value })
                    }
                    placeholder="e.g. What is a Trump Account?"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      value={editing.order}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          order: parseInt(e.target.value) || 1,
                        })
                      }
                      min={1}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editing.published}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            published: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-slate-700">Published</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Answer
                </label>
                <textarea
                  value={editing.answer}
                  onChange={(e) =>
                    setEditing({ ...editing, answer: e.target.value })
                  }
                  placeholder="Write the answer..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white resize-y"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  {editingId ? "Save Changes" : "Add FAQ"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditing(null);
                    setEditingId(null);
                  }}
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deleted FAQs */}
      {showDeleted && deletedFaqs.length > 0 && (
        <Card className="border-red-200 bg-red-50 animate-slide-down">
          <CardHeader>
            <CardTitle className="text-red-800">
              Deleted FAQs ({deletedFaqs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {deletedFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-red-100"
                >
                  <span className="text-sm text-slate-600 line-through">
                    {faq.question}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(faq)}
                  >
                    <RotateCcw size={14} className="mr-1" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="text-primary-600" size={18} />
            FAQs ({activeFaqs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activeFaqs.map((faq) => (
              <div
                key={faq.id}
                className="flex items-start gap-3 bg-white rounded-lg border border-slate-200 px-4 py-4 hover:shadow-md transition-all duration-200"
              >
                <GripVertical
                  size={16}
                  className="text-slate-300 mt-1 flex-shrink-0 cursor-grab"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-400">
                      #{faq.order}
                    </span>
                    <h3 className="font-medium text-slate-900 truncate">
                      {faq.question}
                    </h3>
                    <Badge variant={faq.published ? "success" : "warning"}>
                      {faq.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublished(faq)}
                    title={faq.published ? "Unpublish" : "Publish"}
                  >
                    {faq.published ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(faq)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(faq)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
