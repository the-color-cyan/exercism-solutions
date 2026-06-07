export class LinkedList<T> {
    private length: number = 0;
    private root: SentinelNode<T>;

    constructor() {
        this.root = {} as SentinelNode<T>;
        this.root.next = this.root;
        this.root.prev = this.root;
    }

    public push(element: T) {
        this.insertAt("tail", element);
    }

    public pop(): T | undefined {
        return this.takeAt("tail");
    }

    public shift(): T | undefined {
        return this.takeAt("head");
    }

    public unshift(element: T) {
        this.insertAt("head", element);
    }

    public delete(element: unknown): void {
        // arbitrarily start at tail
        let node = this.root.next;

        while (!isSentinel(node)) {
            if (node.value == element) {
                this.remove(node);
                this.length -= 1;
            }

            node = node.next;
        }
    }

    public count(): number {
        return this.length;
    }

    private insertAt(side: "head" | "tail", element: T): void {
        switch (side) {
            case "head":
                const headNode = {
                    value: element,
                    next: this.root,
                    prev: this.root.prev,
                } as ListNode<T>;

                this.root.prev.next = headNode;
                this.root.prev = headNode;

                break;
            case "tail":
                const tailNode = {
                    value: element,
                    next: this.root.next,
                    prev: this.root,
                } as ListNode<T>;

                this.root.next.prev = tailNode;
                this.root.next = tailNode;

                break;
        }

        this.length += 1;
    }

    private takeAt(side: "head" | "tail"): T | undefined {
        const node = side === "head" ? this.root.prev : this.root.next;

        if (isSentinel(node)) {
            return undefined;
        }

        this.remove(node);
        this.length -= 1;
        return node.value;
    }

    private remove(node: DataNode<T>) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

type ListNode<T> = DataNode<T> | SentinelNode<T>;

type DataNode<T> = {
    value: T;
    next: ListNode<T>;
    prev: ListNode<T>;
};

type SentinelNode<T> = {
    counterpart: SentinelNode<T>;
    next: ListNode<T>;
    prev: ListNode<T>;
};

function isSentinel<T>(node: ListNode<T> | undefined): node is SentinelNode<T> {
    if (node === undefined) return false;
    return !("value" in node);
}
